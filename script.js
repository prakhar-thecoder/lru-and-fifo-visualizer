$("#solution").hide();

$("#solve-btn").click(function () { 
    document.getElementById("frames").innerHTML = "&nbsp;";
    let reference_string = $("#reference-string").val();
    let frame_size = $("#frame-size").val();
    frame_size = parseInt(frame_size);
    let algorithm = $("#inputGroupSelect04").children("option:selected").val();

    if (algorithm == "Select Algorithm") {
        $("#alerts").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">\
        <strong>Error!</strong> Please select an algorithm to continue.\
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
      </div>');
    }
    else if(algorithm == "1"){
        fifo(reference_string, frame_size);
        $("#alerts").append('<div class="alert alert-success alert-dismissible fade show" role="alert">\
        <strong>Success!</strong> Please see the solution below.\
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
      </div>');
    }
    else if(algorithm == "2"){
        lru(reference_string, frame_size);
        $("#alerts").append('<div class="alert alert-success alert-dismissible fade show" role="alert">\
        <strong>Error!</strong> Please see the solution below.\
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>\
      </div>');
    }
});

function fifo(reference_string, frame_size){
    document.getElementById("frames").innerHTML = "";
    var frame_red = '<div class="frame-container">\
    <div id="page-no" class="frame">ref</div>' + '<div class="frame">val</div>'.repeat(frame_size) + '<div id="fault" class="frame">PF</div>\
    </div>';

    var frame_green = '<div class="frame-container">\
    <div id="page-no" class="frame-green">ref</div>' + '<div class="frame-green">val</div>'.repeat(frame_size) + '<div id="fault" class="frame-green">PF</div>\
    </div>';

    let references = reference_string.split(" ");
    let frame = [];
    let pointer = 0;
    let page_faults = 0;

    for(let i = 0; i < references.length; i++){
        references[i] = parseInt(references[i]);
    }

    for(let i = 0; i < references.length; i++){
        if(frame.includes(references[i])){
            let new_frame = frame_green;
            for(let j = 0; j < frame.length; j++){
                new_frame = new_frame.replace("val", frame[j])
            }
            new_frame = new_frame.replace(/val/g, "&nbsp;")
            new_frame = new_frame.replace("ref", references[i])
            new_frame = new_frame.replace("PF", "-")
            $("#frames").append(new_frame);
            continue;
        }
        else if(frame.length != frame_size){
            frame.push(references[i]);
            page_faults += 1;
        }
        else{
            frame[pointer] = references[i];
            page_faults += 1;
            if(pointer != frame_size-1){
                pointer += 1;
            }
            else{
                pointer = 0;
            }
        }
        let new_frame = frame_red;
            for(let j = 0; j < frame.length; j++){
                new_frame = new_frame.replace("val", frame[j])
            }
            new_frame = new_frame.replace(/val/g, "&nbsp;")
            new_frame = new_frame.replace("ref", references[i])
            $("#frames").append(new_frame);
    }
    $("#answer").text(page_faults);
    $("#solution").show();
}

function lru(reference_string, frame_size){
    document.getElementById("frames").innerHTML = "";
    var frame_red = '<div class="frame-container">\
    <div id="page-no" class="frame">ref</div>' + '<div class="frame">val</div>'.repeat(frame_size) + '<div id="fault" class="frame">PF</div>\
    </div>';

    var frame_green = '<div class="frame-container">\
    <div id="page-no" class="frame-green">ref</div>' + '<div class="frame-green">val</div>'.repeat(frame_size) + '<div id="fault" class="frame-green">PF</div>\
    </div>';

    let references = reference_string.split(" ");
    let frame = [];
    let queue = [];
    let page_faults = 0;

    for(let i = 0; i < references.length; i++){
        references[i] = parseInt(references[i]);
    }

    for(let i = 0; i < references.length; i++){
        if(frame.includes(references[i])){
            if(queue.includes(references[i])){
                let index = queue.indexOf(references[i]);
                if(index > -1){
                    queue.splice(index, 1);
                }
            }
            queue.push(references[i]);
            let new_frame = frame_green;
            for(let j = 0; j < frame.length; j++){
                new_frame = new_frame.replace("val", frame[j])
            }
            new_frame = new_frame.replace(/val/g, "&nbsp;")
            new_frame = new_frame.replace("ref", references[i])
            new_frame = new_frame.replace("PF", "-")
            $("#frames").append(new_frame);
            continue;
        }
        else if(frame.length != frame_size){
            queue.push(references[i]);
            frame.push(references[i]);
            page_faults += 1;
        }
        else{
            let element = queue.shift();
            console.log("element : ", element)
            let index = frame.indexOf(element);
            queue.push(references[i]);
            frame[index] = references[i];
            page_faults += 1;
        }
        console.log("queue : ", queue);
        console.log("frame : ", frame);
        let new_frame = frame_red;
            for(let j = 0; j < frame.length; j++){
                new_frame = new_frame.replace("val", frame[j])
            }
            new_frame = new_frame.replace(/val/g, "&nbsp;")
            new_frame = new_frame.replace("ref", references[i])
            $("#frames").append(new_frame);
    }
    $("#answer").text(page_faults);
    $("#solution").show();
}