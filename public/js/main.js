$("#search").click(function() {
    search($("#input_search").val());
});

function search(text) {
    let dataSend = JSON.stringify({ text: text });
    $.ajax({
        type: "POST",
        url: "/search",
        data: dataSend,
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            response = JSON.parse(response)
            console.log(response);
            if (response.length === 0) {
                $("#body").html(`Not exists`)
            } else {
                $("#body").html(``)
                for (const key of response) {
                    $("#body").append(`
                    <div class="card mx-3 my-4 col-12 col-sm-5 col-md-3">
                        <img src="${key.avatar}" class="card-img-top" alt="..." style="width: 100%; height: 60%;">
                        <div class="card-body my-2">
                            <h5 class="card-title">
                                ${key.id}
                            </h5>
                            <p class="card-text">
                                ${key.email}
                            </p>
                            <a href="product/${+key.id - 5}" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    `);
                }
            }
        }
    });

}