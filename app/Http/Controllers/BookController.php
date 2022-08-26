<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
  use \App\Traits\ResourceControllerTrait;

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
  public function index(Request $request)
  {
    $validation = $this->validateIndex($request);
    if($validation["failed"])
      return response($validation["errors"], 400);

    $limit = $request->input("limit", 3);
    $offset = ($request->input("page", 1) - 1) * $limit;

    $books = Book::select();

    if ($this->getSortModel($request)) {
      $sortModel = $this->getSortModel($request);

      if ($sortModel["sort"] == "asc")
      $books->orderBy($sortModel["field"]);
      else
        $books->orderByDesc($sortModel["field"]);
    }

    if ($this->getSearchKeyword($request)) {
      $searchKeyword = $this->getSearchKeyword($request);
      $books->where(function($query) use ($searchKeyword){
        $query->where("title", "like", "%" . $searchKeyword . "%")
              ->orWhere("author", "like", "%" . $searchKeyword . "%");
      });
    }

    $total = $books->count();
    $books->limit($limit)
      ->offset($offset);

    $limited = $books->get();

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
    $book = new Book();
    $book->fill($request->input());
    $book->save();
    return $book;
  }
  
  /**
  * Display the specified resource.
  *
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function show(Book $book)
  {
    return $book;
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
    $book->fill($request->input());
    $book->save();
    return $book;
  }
  
  /**
  * Remove the specified resource from storage.
  *
  * @param  \App\Models\Book  $book
  * @return \Illuminate\Http\Response
  */
  public function destroy(Book $book)
  {
    $arr = $book->toArray();
    $book->delete();
    return $arr;
  }
}
