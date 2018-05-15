$(function() {
  $('html').on('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.originalEvent.dataTransfer.files;
    $.each(files, function(_, file) {
      const li = $('<li>').append(file.name);
      const progress = $('<progress>').val(0).attr('max', 100);

      $('#files').append(li);
      li.append(progress);

      const data = new FormData();
      data.append('file', file);

      $.ajax({
        url: '/upload',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json',
        xhr: function() {
          var xhr = $.ajaxSettings.xhr();
          xhr.upload.addEventListener('progress', function(e) {
            progress.val(e.loaded / e.total * 100);
          });
          return xhr;
        }
      }).done(function(file) {
        li.empty();
        li.append(
          $('<a>')
            .attr('href', `/download/${file.filename}`)
            .text(file.originalname),
          $('<button>')
            .addClass('deleteButton')
            .attr('type', 'button')
            .data('filename', file.filename)
            .text('削除')
        );
      });
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
