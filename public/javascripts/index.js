$(() => {
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
    }).done(function(text) {
      console.log(text);
    });
  });

  $('html').on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
  })
});
