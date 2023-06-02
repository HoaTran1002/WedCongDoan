using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IExamRepository _examRepo;

        public ExamsController(IExamRepository repo)
        {
            _examRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _examRepo.GetAllExams());
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
                var exam = await _examRepo.GetExamById(id);
                return exam == null ? NotFound() : Ok(exam);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(ExamVM examVM)
        {
            try
            {
                await _examRepo.AddExam(examVM);
                return StatusCode(StatusCodes.Status201Created, examVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ExamVM examVM)
        {
            try
            {
                var exam = await _examRepo.GetExamById(examVM.ExamId);
                if (exam == null)
                    return NotFound();

                await _examRepo.UpdateExam(examVM);
                return Ok(examVM);
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
                var exam = await _examRepo.GetExamById(id);
                if (exam == null)
                    return NotFound();

                await _examRepo.DeleteExam(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
