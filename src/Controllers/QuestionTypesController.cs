using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionTypesController : ControllerBase
    {
        private readonly IQuestionTypeRepository _quesTRepo;

        public QuestionTypesController(IQuestionTypeRepository repo)
        {
            _quesTRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _quesTRepo.GetAllQuestionTypes());
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
                var quesT = await _quesTRepo.GetQuestionTypeById(id);
                return quesT == null ? NotFound() : Ok(quesT);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(QuestionTypeVM quesTVM)
        {
            try
            {
                await _quesTRepo.AddQuestionType(quesTVM);
                return StatusCode(StatusCodes.Status201Created, quesTVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(QuestionTypeVM quesTVM)
        {
            try
            {
                var quesT = await _quesTRepo.GetQuestionTypeById(quesTVM.QuesTId);
                if (quesT == null)
                    return NotFound();

                await _quesTRepo.UpdateQuestionType(quesTVM);
                return Ok(quesTVM);
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
                var quesT = await _quesTRepo.GetQuestionTypeById(id);
                if (quesT == null)
                    return NotFound();

                await _quesTRepo.DeleteQuestionType(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
