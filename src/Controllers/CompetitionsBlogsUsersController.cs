using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionsBlogsUsersController : ControllerBase
    {
        private readonly ICompetitionsBlogsUserRepository _cbuRepo;

        public CompetitionsBlogsUsersController(ICompetitionsBlogsUserRepository repo)
        {
            _cbuRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _cbuRepo.GetAllComBlogUsers());
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
                var cbu = await _cbuRepo.GetComBlogUserById(id);
                return cbu == null ? NotFound() : Ok(cbu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(CompetitionsBlogsUserVM cbuVM)
        {
            try
            {
                await _cbuRepo.AddComBlogUser(cbuVM);
                return StatusCode(StatusCodes.Status201Created, cbuVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompetitionsBlogsUserVM cbuVM)
        {
            try
            {
                var cbu = await _cbuRepo.GetComBlogUserById(cbuVM.Id);
                if (cbu == null)
                    return NotFound();

                await _cbuRepo.UpdateComBlogUser(cbuVM);
                return Ok(cbuVM);
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
                var cbu = await _cbuRepo.GetComBlogUserById(id);
                if (cbu == null)
                    return NotFound();

                await _cbuRepo.DeleteComBlogUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
