using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using WebCongDoan_API.Models;
using WebCongDoan_API.ViewModels;
using WebCongDoan_API.Interfaces;

namespace WebCongDoan_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogRepository _blogRepo;

        public BlogsController(IBlogRepository repo) 
        {
            _blogRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _blogRepo.GetAllBlog());
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var blog = await _blogRepo.GetBlogById(id);
                return blog == null ? NotFound() : Ok(blog);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(BlogVM blogVM)
        {
            try
            {
                await _blogRepo.AddBlog(blogVM);
                return StatusCode(StatusCodes.Status201Created, blogVM);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(BlogVM blogVM)
        {
            try
            {
                var blog = await _blogRepo.GetBlogById(blogVM.BlogId);
                if (blog == null)
                    return NotFound();

                await _blogRepo.UpdateBlog(blogVM);
                return Ok(blogVM);
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
                var blog = await _blogRepo.GetBlogById(id);
                if (blog == null)
                    return NotFound();

                await _blogRepo.DeleteBlog(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
