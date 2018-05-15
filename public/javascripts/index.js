$(function() {
  const addFileList = function(file) {
    $('#files').append(
      $('<li>').append(
        $('<a>')
          .attr('href', `/download/${file.filename}`)
          .attr('download', file.originalname)
          .text(file.originalname),
        $('<button>')
          .addClass('deleteButton')
          .attr('type', 'button')
          .data('filename', file.filename)
          .text('削除')
      )
    );
  };

  $('html').on('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.originalEvent.dataTransfer.files;
    const data = new FormData();
    $.each(files, function(_, file) {
      data.append('files', file);
    });

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false,
      dataType: 'json'
    }).done(function(files) {
      files.forEach(addFileList);
    });
  });

  $('html').on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $('#files').on('click', '.deleteButton', function(e) {
    const filename = $(e.target).data('filename');

    $.ajax({
      url: `/files/${filename}`,
      type: 'POST',
      data: {
        '_method': 'DELETE'
      }
    }).done(function() {
      $(e.target).closest('li').remove();
    });
  });
});
