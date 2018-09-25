// $("a.like").click(function(){
//     var curr_elem = $(this) ;
//     $.get($(this).attr('href'), function(data){
//         var my_div = $(curr_elem).parent().find("b");
//         my_div.text(my_div.text()*1+1);     
//     }); 
//     return false; // prevent loading URL from href
// });

// $(document).ready(function() {

//     var user = $('.user').attr('value')
//     console.log(user)

//     $.ajax({
//         method: 'Get',
//         url: '/api/likes',
//         data: user,
//         success: function handleSuccess (json) {
//             console.log(json.likes)
//             console.log('logged in:',user)
//             let likesArray = json.likes

//             new_array = []
//             $.each(likesArray, function () {
//                 if (user == this.user) {
//                     console.log('there is a like for this user in the db')
//                     console.log(this.post)
//                     new_array.push(this.post)
//                 }
//             });
//             console.log("array of logged in users likes:",new_array)

//             $.ajax({
//                 method: 'Get',
//                 url: '/api/feed',
//                 data: user,
//                 success: function handleSuccess (json) {
//                     let postArray = json.posts
//                     // console.log(postArray)
//                     new_post_array = []
//                     $.each(postArray, function () {
//                         new_post_array.push(this.post)
//                     });
//                     console.log('array of logged in users feed posts:',new_post_array)
                    
                   

//                     var matches = new_post_array.filter(function(val) {
//                         return new_array.indexOf(val) != -1;
//                     });
                
//                     console.log(matches)
//                 }
//             });
//         }
//         });
//     });



// function overlap(arr1,arr2) {
//     for(var i = 0; i < new_array.length; ++i)
//     if(new_post_array.indexOf(new_array[i]) != -1)
//         return true;
//     return false;
// }
                            // $.each(postArray, function () {
                                // if (post == )
                        
                    // });
                    // if (post == )
                // }
                
    //         });
    //     }
    // });

//                     // console.log ($('.postLike').attr('value') )
//                     // let post = this.post
//                     // console.log(post)
//                     // $('.postLike').attr('value', post) 
//                     // console.log ( $('.postLike').attr('value'))
//                     // $('.postLike').css('color', 'red')
//                 }
//             })
//         },
//         error: function handleError (e){
//             console.log('error', e);
//         }
// });

$("#commentBox").on('keydown', function(e) {
    if (e.which != 13) {
        return
    }

    let post_id = $(this).attr('data-id')
    let csrf_token = $('input[name=csrfmiddlewaretoken]').val()
    let content = $(this).val()
    // alert(`you pressed ${csrf_token}`)

    // "POST /feed?csrfmiddlewaretoken=d1pUdgvM08kkFSkrcDnXvUQvTTUQNeR2TV3tiq0a59v7T8Uh6P0oxjDXhYHbkSQC&content=abc&post_id=4 HTTP/1.1" 
    // alert(`${post_id} ${csrf_token} ${content}`)
    $.ajax({
        type: 'POST',
        method: 'POST',
        url: '/feed',
        data: {
            csrfmiddlewaretoken: csrf_token,
            post_id: post_id,
            content: content
        },
        success: function onSuccess(response) {
            e.preventDefault();
            console.log(`#${post_id}_cl`)
            // console.log()

            var commentList = document.getElementById(`${post_id}_cl`)
            // console.log($(`#${post_id}_cl`))
            // var je = JSON.stringify(response)
            // $(document).load(response);

            // alert(`${response}`)
            // console.log(e)
        }
    })

});

$.ajax({
    method: 'Get',
    url: '/api/posts',
    success: function onSuccess(e) {
        console.log(e.posts)
    }
})




$('.postLike').on('click', function(element){
    element.preventDefault();
    $(this).addClass('fullHeart')

    var form = $('.likeform').serialize()
    var post = $(this).attr('value')
    var user = $('.user').attr('value')

    console.log("post liked:", post)
    console.log("by user according to form:",user)
    
    var theData = {
        post: post,
        user: user,
        form: form
    }

    likeURL = `http://localhost:8000/post/${post}/like`

    $.ajax({
        method: 'POST',
        url:likeURL,
        data: theData,
        success: function onSuccess(json) {
                console.log(json)
                likesCount =json.likes.length
                if (likesCount > 0) {
                    $('.likeform p').text(`likes: ${likesCount}`)
                }
        },
        error: function onError(err1, err2, err3) {
            console.log(err)
        }
    })
})





$('.follow').on('click', function(element){
    $(this).text('Following')
    element.preventDefault();

    var form = $('.followform').serialize()
    var user_to = $(this).attr('value')
    var user_from = $('.userFrom').attr('value')
    console.log(user_to)
    console.log(user_from)
    var theData = {
        user_to: user_to,
        user_from: user_from,
        form: form
    }

    followURL = `http://localhost:8000/user/${user_to}/follow`

    $.ajax({
        method: 'POST',
        url:followURL,
        data: theData,
        success: function onSuccess(e) {
            console.log('success')
        },
        error: function onError(err1, err2, err3) {
            console.log(err)
        }
    })  
})

$('#commentBox').on('submit',(e)=>{
    e.preventDefault()
})

$('.delete').on('click',(e)=>{
    e.preventDefault()
    $.ajax({
        method: 'DELETE',
        url:'/feed',
        success: function onSuccess(e) {
            console.log('success')
        },
        error: function onError(err) {
            console.log(err)
        }
    })  
})








$('.exploreBox img').hover(
    function() {
    $(this).css('opacity', '.3')  
    $(this).siblings().fadeIn(500).hover (
        function () {
            $(this).show();
            $(this).siblings().css('opacity', '.3') 
        }
    )
    }, function () {
        $('.exploreBox img').css('opacity', '1')  
        $('.exploreBox img').siblings().hide()
    }
);

$('.profile_post_box img').hover(
    function() {
    $(this).css('opacity', '.3')  
    $(this).siblings().fadeIn(500).hover (
        function () {
            $(this).show();
            $(this).siblings().css('opacity', '.3') 
        }
    )
    }, function () {
        $('.profile_post_box img').css('opacity', '1')  
        $('.profile_post_box img').siblings().hide()
    }
);