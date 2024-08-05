using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesWebApplication.Contracts;
using NotesWebApplication.DataAccess;
using NotesWebApplication.Models;

namespace NotesWebApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody]CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);
        await _dbContext.Notes.AddAsync(note,ct);
        await _dbContext.SaveChangesAsync(ct);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery]GetNotesRequest request, CancellationToken ct)
    {
        var notesQuery =  _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                        n.Title.ToLower().Contains(request.Search.ToLower()));

        var selectorKey = GetSelectorKey(request.SortItem);
        
        notesQuery = (request.SortOrder == "desc") 
            ? notesQuery.OrderByDescending(selectorKey) 
            : notesQuery.OrderBy(selectorKey);
     
        
        
        var noteDtos = await notesQuery
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(ct);
        
        return Ok(new GetNotesResponse(noteDtos));
    }

    private Expression<Func<Note,object>> GetSelectorKey(string? sortItem)
    {
        return sortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };
    }
}