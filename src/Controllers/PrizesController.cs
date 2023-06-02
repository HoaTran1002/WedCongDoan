using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrizesController : ControllerBase
    {
        private readonly IPrizeRepository _priRepo;

        public PrizesController(IPrizeRepository repo)
        {
            _priRepo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _priRepo.GetAllPrizes());
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
                var prize = await _priRepo.GetPrizeById(id);
                return prize == null ? NotFound() : Ok(prize);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(PrizeVM priVM)
        {
            try
            {
                await _priRepo.AddPrize(priVM);
                return StatusCode(StatusCodes.Status201Created, priVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(PrizeVM priVM)
        {
            try
            {
                var prize = await _priRepo.GetPrizeById(priVM.PriId);
                if (prize == null)
                    return NotFound();

                await _priRepo.UpdatePrize(priVM);
                return Ok(priVM);
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
                var prize = await _priRepo.GetPrizeById(id);
                if (prize == null)
                    return NotFound();

                await _priRepo.DeletePrize(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
