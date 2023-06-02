using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleRepository _roleRepo;

        public RolesController(IRoleRepository repo)
        {
            _roleRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _roleRepo.GetAllRoles());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var role = await _roleRepo.GetRoleById(id);
                return role == null ? NotFound() : Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(RoleVM roleVM)
        {
            try
            {
                
                await _roleRepo.AddRole(roleVM);
                return StatusCode(StatusCodes.Status201Created, roleVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(RoleVM roleVM)
        {
            try
            {
                var role = await _roleRepo.GetRoleById(roleVM.RoleId);
                if (role == null)
                    return NotFound();

                await _roleRepo.UpdateRole(roleVM);
                return Ok(roleVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var role = await _roleRepo.GetRoleById(id);
                if (role == null)
                    return NotFound();

                await _roleRepo.DeleteRole(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
