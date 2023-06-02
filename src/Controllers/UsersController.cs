using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private IConfiguration _configuration;

        public UsersController(IUserRepository repo, IConfiguration configuration)
        {
            _userRepo = repo;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _userRepo.GetAllUsers());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByDepID")]
        public async Task<IActionResult> GetAllByDepID(int id)
        {
            try
            {
                return Ok(await _userRepo.GetAllUsersByDepID(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByRoleID")]
        public async Task<IActionResult> GetAllByRoleID(int id)
        {
            try
            {
                return Ok(await _userRepo.GetAllUsersByRoleID(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(String id)
        {
            try
            {
                var user = await _userRepo.GetUserById(id);
                return user == null ? NotFound() : Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(RegisterVM registerVM)
        {
            try
            {
                await _userRepo.AddUser(registerVM);
                return StatusCode(StatusCodes.Status201Created, registerVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(UserVM userVM)
        {
            try
            {
                var user = await _userRepo.GetUserById(userVM.UserId);
                if (user == null)
                    return NotFound();

                await _userRepo.UpdateUser(userVM);
                return Ok(userVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(String id)
        {
            try
            {
                var user = await _userRepo.GetUserById(id);
                if (user == null)
                    return NotFound();

                await _userRepo.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> CheckUser(LoginVM loginVM)
        {
            try
            {
                var token = await _userRepo.GetUserByEmailAndPass(loginVM);
                return Ok(new
                {
                    Token = token,
                    ValidTo = TokenHelper.GetValidTo(token)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
