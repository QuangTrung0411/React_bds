<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;// add this line
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test',
        //     'email' => 'adminew@gmail.com',
        //     'password' => Hash::make('adminew'),
        //     'address' => 'vu hoa duc linh',
        //     'phone' => '012345678',
        // ]);

        // $this->call([
        //     UserSeeder::class,
        // ]);
    }
}
