<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
  /**
  * Seed the application's database.
  *
  * @return void
  */
  public function run()
  {
    // \App\Models\User::factory(10)->create();
    
    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);
    
    Book::truncate();
    $faker = \Faker\Factory::create();
    for ($i = 0; $i < 50; $i++) {
      Book::create([
        'title' => $faker->sentence,
        'author' => $faker->name,
      ]);
    }
    
    Role::query()->delete();
    $administratorRole = Role::create([ 'name' => 'administrator' ]);
    $librarianRole = Role::create([ 'name' => 'librarian' ]);
    $studentRole = Role::create([ 'name' => 'student' ]);

    Permission::query()->delete();
    Permission::create(['name' => 'view users'])
      ->assignRole($administratorRole)
      ->assignRole($librarianRole);

    Permission::create(['name' => 'edit users'])
      ->assignRole($administratorRole);

    Permission::create(['name' => 'edit books'])
      ->assignRole($administratorRole)
      ->assignRole($librarianRole);

    Permission::create(['name' => 'view books'])
      ->assignRole($administratorRole)
      ->assignRole($librarianRole)
      ->assignRole($studentRole);

    User::truncate();
    $defaultPassword = 'strongpassword';
    User::create([
      'name' => 'Student',
      'email' => 'student@example.com',
      'password' => Hash::make($defaultPassword),
    ])->assignRole('student');

    User::create([
      'name' => 'Admin',
      'email' => 'admin@example.com',
      'password' => Hash::make($defaultPassword),
    ])->assignRole('administrator');

    User::create([
      'name' => 'Librarian',
      'email' => 'librarian@example.com',
      'password' => Hash::make($defaultPassword),
    ])->assignRole('librarian');
  }
}
  