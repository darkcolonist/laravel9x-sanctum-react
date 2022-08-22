<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function __construct()
  {
    $this->middleware(['can:view users'])->except(['showMyDetails']);
    $this->middleware(['can:edit users'])->only(['update','edit']);
    $this->middleware(['can:create users'])->only(['create','store']);
    $this->middleware(['can:delete users'])->only(['destroy']);
  }

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */
  public function index()
  {
    $users = User::inRandomOrder();
    $total = $users->count();
    $limited = $users->limit(5)->get();

    return response()->json([
      "total" => $total
      , "rows" => $limited
    ]);
  }
  
  /**
  * Show the form for creating a new resource.
  *
  * @return \Illuminate\Http\Response
  */
  public function create()
  {
    //
  }
  
  /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  */
  public function store(Request $request)
  {
    //
  }
  
  /**
  * Display the specified resource.
  *
  * @param  \App\Models\User  $user
  * @return \Illuminate\Http\Response
  */
  public function show(User $user)
  {
    //
  }
  
  /**
  * Show the form for editing the specified resource.
  *
  * @param  \App\Models\User  $user
  * @return \Illuminate\Http\Response
  */
  public function edit(User $user)
  {
    //
  }
  
  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \App\Models\User  $user
  * @return \Illuminate\Http\Response
  */
  public function update(Request $request, User $user)
  {
    //
  }
  
  /**
  * Remove the specified resource from storage.
  *
  * @param  \App\Models\User  $user
  * @return \Illuminate\Http\Response
  */
  public function destroy(User $user)
  {
    //
  }

  public function showMyDetails(){
    $user = auth()->user();

    $permissions = [];

    foreach ($user->getAllPermissions() as $pkey => $pval) {
      $permissions[] = $pval["name"];
    }

    return [
      "email" => $user->email, "permissions" => $permissions
    ];
  }
}
