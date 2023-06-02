using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.Models;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionsPrizesController : ControllerBase
    {
        private readonly ICompetitionsPrizeRepository _comPriRepo;

        public CompetitionsPrizesController(ICompetitionsPrizeRepository repo)
        {
            _comPriRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _comPriRepo.GetAllCompetitionsPrizes());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByComID")]
        public async Task<IActionResult> GetAllByComID(int id)
        {
            try
            {
                return Ok(await _comPriRepo.GetAllCompetitionsPrizesByComID(id));
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
                var comPri = await _comPriRepo.GetCompetitionsPrizeById(id);
                return comPri == null ? NotFound() : Ok(comPri);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(CompetitionsPrizeVM comPVM)
        {
            try
            {
                await _comPriRepo.AddCompetitionsPrize(comPVM);
                return StatusCode(StatusCodes.Status201Created, comPVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompetitionsPrizeVM comPVM)
        {
            try
            {
                var comPri = await _comPriRepo.GetCompetitionsPrizeById(comPVM.Cpid);
                if (comPri == null)
                    return NotFound();

                await _comPriRepo.UpdateCompetitionsPrize(comPVM);
                return Ok(comPVM);
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
                var comPri = await _comPriRepo.GetCompetitionsPrizeById(id);
                if (comPri == null)
                    return NotFound();

                await _comPriRepo.DeleteCompetitionsPrize(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
