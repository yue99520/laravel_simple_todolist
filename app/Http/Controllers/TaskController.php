<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $tasks = Task::query()->where('done', false)->get();
        return response()->json([
            'success' => true,
            'message' => 'ok',
            'data' => $tasks->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        $data = $this->validate($request, [
            'title' => ['required', 'max:50'],
            'content' => ['required', 'max:300'],
        ]);

        $task = new Task();

        return $this->makeTask($task, $data['title'], $data['content']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $task = Task::query()->find($id);

        if ($task !== null) {
            return response()->json([
                'success' => true,
                'message' => 'ok',
                'data' => $task->toArray(),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'task is not found',
                'data' => null,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => ['required', 'max:50'],
            'content' => ['required', 'max:300'],
        ]);

        $task = Task::query()->find($id);

        if ($task !== null) {

            return $this->makeTask($task, $data['title'], $data['content']);
        } else {

            return response()->json([
                'success' => false,
                'message' => 'task is not found',
                'data' => null,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        if (Task::query()->where('id', $id)->exists()) {
            Task::destroy($id);

            return response()->json([
                'success' => true,
                'message' => 'ok',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'msessage' => 'task is not found',
            ]);
        }
    }

    private function makeTask($task, $title, $content)
    {
        $task->title = $title;
        $task->content = $content;
        $success = $task->save();

        if ($success) {
            return response()->json([
                'success' => true,
                'message' => 'ok',
                'data' => $task->toArray(),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'error on saving',
                'data' => null,
            ]);
        }
    }
}
