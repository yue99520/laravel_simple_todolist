<!DOCTYPE html>
<head>
    <meta charset="utf-8">

    <title>TodoList</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
    <script src="{{ asset('/js/app.js') }}"></script>
</head>
<body>
    <div class="ui menu">
        <h1 class="item">
            TodoList
        </h1>
    </div>
    <div class="ui container">
        <div class="ui grid">
            <div class="ui three wide column"></div>
            <div class="ui ten wide column">
                <div id="create_task_container">
                    {{--create task form--}}
                </div>
                <br>
                <div id="task_container">
                    {{--tasks here--}}
                </div>
            </div>
            <div class="ui three wide column"></div>
        </div>
    </div>
</body>

