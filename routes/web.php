<?php

use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GuestController::class, 'index'])->name('guest.index');
Route::get('/{ruang}', [GuestController::class, 'show'])->name('guest.show');
