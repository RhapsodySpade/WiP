$( document ).ready(function() {
    $('#button_mine').click(function()
    {
        $('#mine_fields').show();
        $('#button_mine').hide();
        $('#button_other').hide();
        $('#return').show();
        $('#create').show();
        $('#private_repo').val("");
        $('#select_mine').show();
    });

    $('#button_other').click(function()
    {
        $('#other_fields').show();
        $('#login_repo').val("");
        $('#login_repo').show();
        $('#button_mine').hide();
        $('#button_other').hide();
        $('#return').show();
        $('#create').show();
    });

    $('#return').click(function()
    {
        $('#ok').hide();
        $('#login_repo').hide();
        $('#mine_fields').hide();
        $('#button_mine').show();
        $('#button_other').show();
        $('#return').hide();
        $('#create').hide();
        $('#select_mine').hide();
        $('#select_other').hide();
    });

    $('#ok').click(function()
    {
        $.ajax({
          url: "php/get_repos.php",
          method: "post",
          data: { login: $('#login_repo').val() },
          success: function(res){
            res = jQuery.parseJSON(res);
            $('#select_other').show();
            $('#select_other').empty();
            for (var i = 0; i < res.length; i++)
            {
                $('#select_other').append('<option>' + res[i].name + '</option>');
            }
        }
        });
    });

    $('#login_repo').keyup(function(event)
    {
        var user = $(this).val();
        $.ajax({
          url: "php/check_user.php",
          method: "post",
          data: { login: user },
          success: function(res){
            res = jQuery.parseJSON(res);
            //if (res.length == 1)
                $('#ok').show();
            //else
                //$('#ok').hide();
        }
        });
    });

    $('#create').click(function()
    {
        var repo;
        var login = null;
        if ($('#select_other').val() != null)
        {
            login = $('#login_repo').val();
            repo = $('#select_other').val();
        }
        else
        {
            if ($('#private_repo').val() != "")
                repo = $('#private_repo').val();
            else
                repo = $('#select_mine').val();
        }
        $.ajax({
          url: "php/parse_repo.php",
          method: "post",
          data: { login: login, repo: repo },
          success: function(res){
              res = $.parseJSON(res);
              $(location).attr('href', "./show.php?id=" + res);
        }
        });
    });

    $('#project-edit').click(function()
    {
        if ($('#project-edit').children().text() != "Save")
        {
            $('#name').attr("contenteditable","true");
            $('#description').attr("contenteditable","true");
            $('#project-edit').children().text("Save");
        }
        else
        {
            var oldname = $('#oldname').val();
            var author = $('#author').val();
            $('#name').attr("contenteditable","false");
            $('#description').attr("contenteditable","false");
            $('#project-edit').children().text("Edit this project");
            $.ajax({
              url: "php/edit_repo.php",
              method: "post",
              data: { author: author, oldname: oldname, name: $('#name').val(), description: $('#description').text() },
              success: function(res){
                  console.log(res);
            }
            });
        }
    });


    /*MENU DROPDOWN HEADER*/
    $('#menu').hover(function()
    {
        $('#header').css("overflow","visible");

	});
	


});
