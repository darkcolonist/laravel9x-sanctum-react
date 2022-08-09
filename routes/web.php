<?php

use App\Http\Controllers\BookController;
// use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     // return view('welcome');
//     return view('myreact');
// });


Route::middleware(['auth:sanctum'])->group(function () {
  Route::get('/book', [BookController::class, 'index']);
  Route::get('/secure', function () {
    return "you are viewing secure page.";
  });
});

// Route::post('login', [Auth\LoginController::class, 'login']);
// Route::post('logout', [Auth\LoginController::class, 'logout']);

Auth::routes();

Route::any('/{any}', function(){
  return view('myreact');
})->where('any', '.*');