require('./bootstrap');
import {taskDelete, taskIndex, taskStore, taskUpdate} from "./task";
import './task'


function taskViewSegment(id, title, content) {
    return "<div class='ui segment task' data-taskid='" + id + "'>" +
        "<h2 class='task_title'>" +
        title +
        "</h2>" +
        "<p class='task_content'>" +
        content +
        "</p>" +
        "<div class='ui buttons'>" +
        "<div class='ui teal button edit_task_button'>Edit</div>" +
        "<div class='ui pink button delete_task_button'>Delete</div>" +
        "</div>" +
        "</div>";
}

function loadTasks() {
    taskIndex()
        .then(function (tasksJson) {
            if (tasksJson.code === undefined) {
                let i;
                for (i = 0; i < tasksJson.length; i++) {
                    $('#task_container').prepend(
                        taskViewSegment(tasksJson[i].id, tasksJson[i].title, tasksJson[i].content)
                    );
                }

                initViewTaskButton();
            } else {
                $('#task_container').prepend(
                    "<div class='ui red segment' data-taskid='" + tasksJson[i].id + "'>" +
                    "<p>error</p>" +
                    "</div>"
                )
            }
        });
}

function reloadTask(id, title, content) {
    let task = $('.segment.task[data-taskid="' + id + '"]');
    task.find('.task_title')
        .text(title)
    ;
    task.find('.task_content')
        .text(content)
    ;
}

/*
* 預覽任務
* */

function initViewTaskButton() {
    $(".edit_task_button")
        .click(function() {
            console.log('edit task.')
            let taskEle = $(this).closest('.task');

            let id = taskEle.data('taskid');
            let title = taskEle.find('.task_title').text();
            let content = taskEle.find('.task_content').text();
            showEditTaskModal(id, title, content);
        })
    ;

    $(".delete_task_button")
        .click(function() {
            console.log('delete task.')
            let taskEle = $(this).closest('.task');

            let id = taskEle.data('taskid');
            let title = taskEle.find('.task_title').text();
            showDeleteTaskModal(id, title);
        })
    ;
}

/*
* 新增任務
* */

function initCreateTaskModal() {
    $('#create_task_button')
        .click(function () {
            console.log('create task.')
            showCreateTaskModal();
        })
    ;
    $('#create_modal_ok')
        .click(function () {
            let title = $('#create_modal_header').val();
            let content = $('#create_modal_content').val();

            taskStore(title, content)
                .then(function (taskJson) {
                    $('#task_container').prepend(
                        taskViewSegment(taskJson.id, taskJson.title, taskJson.content)
                    )
                    $('#create_modal')
                        .modal('hide')
                    ;
                    $('#create_modal_header')
                        .val('')
                    ;
                    $('#create_modal_content')
                        .val('')
                    ;
                    initViewTaskButton();
                })
        })
    ;
    $('#create_modal_cancel')
        .click(function () {
            $('#create_modal')
                .modal('hide')
            ;
        })
    ;
}

function showCreateTaskModal() {
    $('#create_modal')
        .modal('show')
    ;
}

/*
* 更新任務
* */
function initEditTaskModal() {
    $('#edit_modal_ok')
        .click(function () {
            let id = $('#edit_modal').data('taskid');
            let title = $('#edit_modal_header').val();
            let content = $('#edit_modal_content').val();

            taskUpdate(id, title, content)
                .then(function (taskJson) {
                    $('#edit_modal')
                        .modal('hide')
                    ;
                    reloadTask(id, title, content);
                });
        })
    ;
    $('#edit_modal_cancel')
        .click(function () {
            $('#edit_modal')
                .modal('hide')
            ;
        })
    ;
}

function showEditTaskModal(id, title, content) {
    $('#edit_modal')
        .data('taskid', id)
        .modal('show')
    ;
    $('#edit_modal_header')
        .val(title)
    ;
    $('#edit_modal_content')
        .val(content)
    ;
}

/*
* 刪除任務
* */
function initDeleteTaskModal() {
    $('#delete_modal_ok')
        .click(function () {
            let id = $('#delete_modal').data('taskid')
            taskDelete(id)
                .then(function (taskJson) {
                    $('#delete_modal')
                        .modal('hide')
                    ;
                    $('.task[data-taskid="' + id + '"]')
                        .remove()
                    ;
                })
            ;
        })
    ;
    $('#delete_modal_cancel')
        .click(function () {
            $('#delete_modal')
                .modal('hide')
            ;
        })
    ;
}

function showDeleteTaskModal(id, title) {
    $('#delete_modal')
        .data('taskid', id)
        .modal('show')
    ;
    $('#delete_modal_content')
        .text('確定要刪除任務：「' + title + '」嗎？')
}

$(document).ready(function () {
    initCreateTaskModal();
    initEditTaskModal();
    initDeleteTaskModal();
    loadTasks();
});
