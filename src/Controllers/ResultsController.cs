using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly IResultRepository _resultRepo;

        public ResultsController(IResultRepository repo)
        {
            _resultRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _resultRepo.GetAllResults());
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
                var result = await _resultRepo.GetResultById(id);
                return result == null ? NotFound() : Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetByComUserId")]
        public async Task<IActionResult> GetByCUId(int id)
        {
            try
            {
                var result = await _resultRepo.GetResultByCUId(id);
                return result == null ? NotFound() : Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ResultVM resultVM)
        {
            try
            {
                await _resultRepo.AddResult(resultVM);
                return StatusCode(StatusCodes.Status201Created, resultVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ResultVM resultVM)
        {
            try
            {
                var result = await _resultRepo.GetResultById(resultVM.ResId);
                if (result == null)
                    return NotFound();

                await _resultRepo.UpdateResult(resultVM);
                return Ok(resultVM);
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
                var result = await _resultRepo.GetResultById(id);
                if (result == null)
                    return NotFound();

                await _resultRepo.DeleteResult(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
