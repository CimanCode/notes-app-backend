const { AddNoteHandler, GetAllNotesHandler, GetNotByIdHandler, EditByIdHandler, DeleteByIdHandler } = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: AddNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: GetAllNotesHandler
  },    
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: GetNotByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: EditByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: DeleteByIdHandler
  }
];

module.exports = routes;
