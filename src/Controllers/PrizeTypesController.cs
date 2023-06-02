using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrizeTypesController : ControllerBase
    {
        private readonly IPrizeTypeRepository _priTRepo;

        public PrizeTypesController(IPrizeTypeRepository repo) 
        {
            _priTRepo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _priTRepo.GetAllPrizeTypes());
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
                var priT = await _priTRepo.GetPrizeTypeById(id);
                return priT == null ? NotFound() : Ok(priT);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(PrizeTypeVM priTVM)
        {
            try
            {
                await _priTRepo.AddPrizeType(priTVM);
                return StatusCode(StatusCodes.Status201Created, priTVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(PrizeTypeVM priTVM)
        {
            try
            {
                var priT = await _priTRepo.GetPrizeTypeById(priTVM.PriTid);
                if (priT == null)
                    return NotFound();

                await _priTRepo.UpdatePrizeType(priTVM);
                return Ok(priTVM);
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
                var priT = await _priTRepo.GetPrizeTypeById(id);
                if (priT == null)
                    return NotFound();

                await _priTRepo.DeletePrizeType(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
