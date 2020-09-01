import {taskDelete, taskIndex, taskStore, taskUpdate} from "./task";

require('./bootstrap');

import './task'

function taskCreateSegment() {
    return "<div class='ui fluid segment task'>" +
                "<h2>Create Task</h2>" +
                "<div class='ui form'>" +
                    "<div class='field'>" +
                        "<label>Title</label>" +
                        "<input class='create_task_title' type='text' name='title' placeholder='title'>" +
                    "</div>" +
                    "<div class='field'>" +
                        "<label>Content</label>" +
                        "<textarea class='create_task_content' rows='2' name='content' placeholder='content'></textarea>" +
                    "</div>" +
                    "<div class='ui teal button create_task_button'>Create</div>" +
                "</div>" +
        "</div>"
}

function taskEditSegment(id, title, content) {
    return "<div class='ui segment task' data-taskid='" + id + "'>" +
                "<div class='ui form'>" +
                    "<div class='field'>" +
                        "<lable>Title</lable>" +
                        "<input class='task_title' type='text' name='title' data-origin='" + title + "' value='" + title + "'>" +
                    "</div>" +
                    "<div class='field'>" +
                        "<lable>Content</lable>" +
                        "<textarea class='task_content' rows='2' name='content' data-origin='" + content + "'>" +
                            content +
                        "</textarea>" +
                    "</div>" +
                    "<div class='ui buttons'>" +
                        "<div class='ui teal button update_task_button'>Save</div>" +
                        "<div class='ui grey button cancel_task_button'>Cancel</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
}

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

function registerViewTaskButton() {

    $(".edit_task_button").click(function() {
        console.log('edit_task_button on click.')
        let taskEle = $(this).closest('.task');
        editTask(taskEle);
    });

    $(".delete_task_button").click(function() {
        console.log('delete_task_button on click.')
        let taskEle = $(this).closest('.task');
        deleteTask(taskEle);
    });
}

function registerEditTaskButton() {
    $('.update_task_button').click(function () {
        let taskEle = $(this).closest('.task');
        updateTask(taskEle);
    });

    $('.cancel_task_button').click(function () {
        let taskEle = $(this).closest('.task');
        cancelEdit(taskEle);
    });
}

function registerCreateTaskButton() {
    $(".create_task_button").click(function() {
        console.log('create_task_button on click.')
        createTask();
    });
}

function loadCreateTask() {
    $('#create_task_container')
        .empty()
        .append(taskCreateSegment());

    registerCreateTaskButton();
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

                registerViewTaskButton();
            } else {
                $('#task_container').prepend(
                    "<div class='ui red segment' data-taskid='" + tasksJson[i].id + "'>" +
                    "<p>error</p>" +
                    "</div>"
                )
            }
        });
}

function createTask() {
    let title = $('.create_task_title');
    let content = $('.create_task_content');

    taskStore(title.val(), content.val())
        .then(function (taskJson) {
            console.log(taskJson)
            $('#task_container').prepend(
                taskViewSegment(taskJson.id, taskJson.title, taskJson.content)
            )

            registerViewTaskButton();
        });

    title.val('');
    content.val('');
}

function updateTask(taskEle) {
    let id = taskEle.data('taskid');
    let title = taskEle.find('.task_title').val();
    let content = taskEle.find('.task_content').val();

    taskUpdate(id, title, content)
        .then(function (taskJson) {

            taskEle.replaceWith(taskViewSegment(taskJson.id, taskJson.title, taskJson.content));

            registerViewTaskButton();

        });

    alert('Task updated successfully.')
}

function editTask(taskEle) {
    let id = taskEle.data('taskid');
    let title = taskEle.find('.task_title').text();
    let content = taskEle.find('.task_content').text();

    console.log(id)
    console.log(title)
    console.log(content)
    taskEle.replaceWith(taskEditSegment(id, title, content));
    registerEditTaskButton();
}

function cancelEdit(taskEle) {
    let id = taskEle.data('taskid');
    let title = taskEle.find('.task_title').data('origin');
    let content = taskEle.find('.task_content').data('origin');

    taskEle.replaceWith(taskViewSegment(id, title, content));
    registerViewTaskButton();
}

function deleteTask(taskEle) {
    let id = taskEle.data('taskid');

    taskDelete(id)
        .then(function (data) {
            taskEle.remove();
            alert('Task deleted successfully.');
        })
}

$(document).ready(function () {
    loadCreateTask();
    loadTasks();
});

