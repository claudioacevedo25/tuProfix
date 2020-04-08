document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });


  $(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });
        

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems);
  });

  
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
        
  AOS.init();