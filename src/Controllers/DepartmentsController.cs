using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _depRepo;

        public DepartmentsController(IDepartmentRepository repo) 
        {
            _depRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _depRepo.GetAllDepartments());
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
                var dep = await _depRepo.GetDepartmentById(id);
                return dep == null ? NotFound() : Ok(dep);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(DepartmentVM depVM)
        {
            try
            {
                await _depRepo.AddDepartment(depVM);
                return StatusCode(StatusCodes.Status201Created, depVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(DepartmentVM depVM)
        {
            try
            {
                var dep = await _depRepo.GetDepartmentById(depVM.DepId);
                if (dep == null)
                    return NotFound();

                await _depRepo.UpdateDepartment(depVM);
                return Ok(depVM);
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
                var dep = await _depRepo.GetDepartmentById(id);
                if (dep == null)
                    return NotFound();

                await _depRepo.DeleteDepartment(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
