const { nanoid } = require('nanoid');
const notes = require('./notes');

const AddNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil di tambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal di tambahkan',
  });
  response.code(500);
  response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
  return response;
};

const GetAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },

});

const GetNotByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((notess) => notess.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Data Tidak Ditemukan',
  });
  response.code(404);
  return response;
};

const EditByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Berhasil Mengubah Data',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal mengubah data',
  });
  response.code(404);
  return response;
};

const DeleteByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(id !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Data Berhasil Dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Gagal Menghapus data, id tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = {
  AddNoteHandler, GetAllNotesHandler, GetNotByIdHandler, EditByIdHandler, DeleteByIdHandler
};
