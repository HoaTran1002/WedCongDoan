using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebCongDoan_API.Interfaces;
using WebCongDoan_API.ViewModels;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;

        public TagsController(ITagRepository repo)
        {
            _tagRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _tagRepo.GetAllTags());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllByBlogID")]
        public async Task<IActionResult> GetAllByBlogID(int id)
        {
            try
            {
                return Ok(await _tagRepo.GetAllTagsByBlogID(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetTagById(int id)
        {
            try
            {
                var com = await _tagRepo.GetTagById(id);
                return com == null ? NotFound() : Ok(com);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(TagVM tagVM)
        {
            try
            {
                await _tagRepo.AddTag(tagVM);
                return StatusCode(StatusCodes.Status201Created, tagVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(TagVM tagVM)
        {
            try
            {
                var com = await _tagRepo.GetTagById(tagVM.TagId);
                if (com == null)
                    return NotFound();

                await _tagRepo.UpdateTag(tagVM);
                return Ok(tagVM);
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
                var tag = await _tagRepo.GetTagById(id);
                if (tag == null)
                    return NotFound();

                await _tagRepo.DeleteTag(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
