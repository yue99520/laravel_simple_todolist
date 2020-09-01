const host = 'http://localhost:8000'

function errorFormatter(response) {
    if (response.message !== undefined) {
        return {
            code: response.status,
            message: response.message,
        };
    } else {
        return {
            code: response.status,
            message: 'unknown error.'
        };
    }
}

function taskIndex() {
    return fetch(host + '/api/task')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return json.data;
        })
        .catch(function (response) {
            return errorFormatter(response);
        });
}

function taskShow(id) {
    return fetch(host + '/api/task/' + id, {
        headers: {
            'Accept': 'application/json',
        },
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return json.data;
        })
        .catch(function (response) {
            return errorFormatter(response);
        });
}

function taskStore(title, content) {
    return fetch(host + '/api/task', {
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'title': title,
            'content': content,
        }),
        method: 'POST'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return json.data;
        })
        .catch(function (response) {
            return errorFormatter(response);
        });
}

function taskUpdate(id, title, content) {
    return fetch(host + '/api/task/' + id, {
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'title': title,
            'content': content,
        }),
        method: 'PATCH'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return json.data;
        })
        .catch(function (response) {
            return errorFormatter(response);
        });
}

function taskDelete(id) {
    return fetch(host + '/api/task/' + id, {
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        method: 'DELETE'
    })
}

export {
    taskIndex,
    taskShow,
    taskStore,
    taskUpdate,
    taskDelete,
}
