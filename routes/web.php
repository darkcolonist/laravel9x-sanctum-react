<?php

use Illuminate\Http\Request;
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
  Route::get('/secure', function () {
    return "you are viewing secure page.";
  });
});

Route::post('/login', function(Request $request){
  return $request->all();
});

Route::any('/{any}', function(){
  return view('myreact');
})->where('any', '.*');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');