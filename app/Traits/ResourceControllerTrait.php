<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
trait ResourceControllerTrait
{
  public function validateIndex(Request $request){
    $validator = Validator::make($request->all(), [
      'limit' => 'numeric|min:5|max:50',
      'page' => 'numeric|gte:1',
    ]);

    return [
      "failed" => $validator->fails(),
      "errors" => $validator->errors()
    ];
  }

  public function getSortModel(Request $request){
    $sortModel = $request->input("sortModel", null);

    if($sortModel === null)
      return false;

    try {
      $decoded = json_decode($request->input("sortModel")[0],true);
    } catch (\Throwable $th) {
      throw new \Error("malformed sort model");
    }
    return $decoded;
  }

  public function getSearchKeyword(Request $request){
    if($request->input("searchKeyword") == null)
      return false;

    return $request->input("searchKeyword");
  }

  public function getFilterModel(Request $request){
    $filterModel = $request->input("filterModel", null);

    if($filterModel === null)
      return false;

    try {
      $decoded = json_decode($request->input("filterModel"),true)["quickFilterValues"];

      if(count($decoded) < 1){ // empty search
        return false;  
      }else{
        $decoded = $decoded[0];
      }


      if(trim($decoded) == "")
        return false;
    } catch (\Throwable $th) {
      throw new \Error("malformed filter model");
    }
    return $decoded;
  }
}