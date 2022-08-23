<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
  public function __construct()
  {
    $this->middleware(['can:view books']);
    $this->middleware(['can:edit books'])->only(['update', 'edit']);
    $this->middleware(['can:create books'])->only(['create', 'store']);
    $this->middleware(['can:delete books'])->only(['destroy']);
  }

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */
  public function index()
  {
    $books = Book::inRandomOrder();
    $total = $books->count();
    $limited = $books->limit(5)->get();

    return response()->json([
      "total" => $total, "rows" => $limited
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
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function show(Book $book)
  {
    //
  }
  
  /**
  * Show the form for editing the specified resource.
  *
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function edit(Book $book)
  {
    //
  }
  
  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function update(Request $request, Book $book)
  {
    //
  }
  
  /**
  * Remove the specified resource from storage.
  *
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function destroy(Book $book)
  {
    //
  }
}
