namespace NotesWebApplication.Contracts;

public record GetNotesRequest(string? Search, string? SortItem, string? SortOrder);