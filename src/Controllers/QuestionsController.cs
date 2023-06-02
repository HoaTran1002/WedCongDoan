using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionRepository _quesRepo;

        public QuestionsController(IQuestionRepository repo) 
        {
            _quesRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _quesRepo.GetAllQuestions());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByExamID")]
        public async Task<IActionResult> GetAllByExamID(int id)
        {
            try
            {
                var quess = await _quesRepo.GetQuestionByExamId(id);
                if(quess == null)
                    return NotFound();

                return Ok(await _quesRepo.GetAllQuestionByExamId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetByQuesId")]
        public async Task<IActionResult> GetByQuesId(int id)
        {
            try
            {
                var ques = await _quesRepo.GetQuestionByQuesId(id);
                return ques == null ? NotFound() : Ok(ques);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(QuestionVM quesVM)
        {
            try
            {
                await _quesRepo.AddQuestion(quesVM);
                return StatusCode(StatusCodes.Status201Created, quesVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(QuestionVM quesVM)
        {
            try
            {
                var ques = await _quesRepo.GetQuestionByQuesId(quesVM.QuesId);
                if (ques == null)
                    return NotFound();

                await _quesRepo.UpdateQuestion(quesVM);
                return Ok(quesVM);
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
                var ques = await _quesRepo.GetQuestionByQuesId(id);
                if (ques == null)
                    return NotFound();

                await _quesRepo.DeleteQuestion(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
