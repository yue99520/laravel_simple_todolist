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
                    <div id="create_task_button" class="ui right floated primary button">
                        新增任務
                    </div>
                </div>
            </div>
            <div class="ui three wide column"></div>
        </div>
    </div>
    <div id="edit_modal" data-taskid="" class="ui modal">
        <i class="close icon"></i>
        <div id="edit_loader" class="ui inverted dimmer">
            <div class="ui text loader">Loading</div>
        </div>
        <div class="header">
            修改任務
        </div>
        <div class="content">
            <div class="ui form">
                <div class="field">
                    <label>標題</label>
                    <input id="edit_modal_header" type="text" name="title" value="">
                </div>
                <div class="field">
                    <label>內容</label>
                    <textarea id="edit_modal_content" rows="2" name="content">
                    </textarea>
                </div>
            </div>
        </div>
        <div class="actions">
            <div id="edit_modal_cancel" class="ui button">取消</div>
            <div id="edit_modal_ok" class="ui button">確認</div>
        </div>
    </div>
    <div id="create_modal" class="ui modal">
        <i class="close icon"></i>
        <div id="create_loader" class="ui inverted dimmer">
            <div class="ui text loader">Loading</div>
        </div>
        <div class="header">
            新增任務
        </div>
        <div class="content">
            <div class="ui form">
                <div class="field">
                    <label>標題</label>
                    <input id="create_modal_header" type="text" name="title" value="">
                </div>
                <div class="field">
                    <label>內容</label>
                    <textarea id="create_modal_content" rows="2" name="content"></textarea>
                </div>
            </div>
        </div>
        <div class="actions">
            <div id="create_modal_cancel" class="ui button">取消</div>
            <div id="create_modal_ok" class="ui button">確認</div>
        </div>
    </div>
    <div id="view_modal" class="ui modal">
        <i class="close icon"></i>
        <h1 id="view_modal_header" class="header">
            Title
        </h1>
        <div id="view_modal_content" class="content">
            content...
        </div>
        <div class="actions">
            <div id="view_modal_cancel" class="ui button">取消</div>
            <div id="view_modal_ok" class="ui button">確定</div>
        </div>
    </div>
    <div id="delete_modal" class="ui tiny modal" data-taskid="">
        <i class="close icon"></i>
        <div id="delete_loader" class="ui inverted dimmer">
            <div class="ui text loader">Loading</div>
        </div>
        <h1 id="delete_modal_header" class="header">
            確認刪除？
        </h1>
        <div class="content">
            <p id="delete_modal_content">
                content...
            </p>
        </div>
        <div class="actions">
            <div id="delete_modal_cancel" class="ui button">取消</div>
            <div id="delete_modal_ok" class="ui button">確認</div>
        </div>
    </div>
</body>
