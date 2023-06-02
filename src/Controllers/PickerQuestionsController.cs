using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickerQuestionsController : ControllerBase
    {
        private readonly IPickerQuestionRepository _pickRepo;

        public PickerQuestionsController(IPickerQuestionRepository repo)
        {
            _pickRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _pickRepo.GetAllPickerQuestions());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByComUserId")]
        public async Task<IActionResult> GetAllByCUId(int id)
        {
            try
            {
                return Ok(await _pickRepo.GetAllPickerQuestionsByCUId(id));
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
                var pickQ = await _pickRepo.GetPickerQuestionById(id);
                return pickQ == null ? NotFound() : Ok(pickQ);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(PickerQuestionVM pickQVM)
        {
            try
            {
                await _pickRepo.AddPickerQuestion(pickQVM);
                return StatusCode(StatusCodes.Status201Created, pickQVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(PickerQuestionVM pickQVM)
        {
            try
            {
                var pickQ = await _pickRepo.GetPickerQuestionById(pickQVM.Pqid);
                if (pickQ == null)
                    return NotFound();

                await _pickRepo.UpdatePickerQuestion(pickQVM);
                return Ok(pickQVM);
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
                var pickQ = await _pickRepo.GetPickerQuestionById(id);
                if (pickQ == null)
                    return NotFound();

                await _pickRepo.DeletePickerQuestion(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
