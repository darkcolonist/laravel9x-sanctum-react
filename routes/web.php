<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
// use Illuminate\Support\Facades\Auth;
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

if(env("APP_ENV") === 'local')
  sleep(1); // simulate slowness (or loader testing)

Route::middleware(['auth:sanctum'])->group(function () {
  Route::resource('user', UserController::class)->parameters([
    'user' => 'user:email'
  ]);
  Route::resource('book', BookController::class);

  Route::get('/secure', function () {
    return "you are viewing secure page.";
  });
  Route::post('/me', [UserController::class, 'showMyDetails']);
});

Route::post('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout']);

// Auth::routes();

Route::any('/{any?}', function(){
  return view('myreact');
})->where('any', '.*')->name('/');