using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionsController : ControllerBase
    {
        private readonly ICompetitionRepository _comRepo;

        public CompetitionsController(ICompetitionRepository repo) 
        {
            _comRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _comRepo.GetAllCompetitions());
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
                var com = await _comRepo.GetCompetitionById(id);
                return com == null ? NotFound() : Ok(com);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(CompetitionVM comVM)
        {
            try
            {
                await _comRepo.AddCompetition(comVM);
                return StatusCode(StatusCodes.Status201Created, comVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompetitionVM comVM)
        {
            try
            {
                var com = await _comRepo.GetCompetitionById(comVM.ComId);
                if (com == null)
                    return NotFound();

                await _comRepo.UpdateCompetition(comVM);
                return Ok(comVM);
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
                var com = await _comRepo.GetCompetitionById(id);
                if (com == null)
                    return NotFound();

                await _comRepo.DeleteCompetition(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
