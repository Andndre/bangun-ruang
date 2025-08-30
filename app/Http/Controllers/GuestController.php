<?php

namespace App\Http\Controllers;

class GuestController extends Controller
{
    public static $ruang = [
        'kubus',
        'balok',
        'prisma-segitiga',
        'limas',
        'kerucut',
        'tabung',
        'bola',
    ];

    public function index()
    {
        return view('app');
    }

    public function show(string $ruang)
    {
//        Ruang bangun:
//        Kubus
//        Balok
//        Prisma
//        Limas
//        Kerucut
//        Tabung
//        Bola

        if (in_array($ruang, GuestController::$ruang)) {
            return view('show', [
                'ruang' => $ruang,
            ]);
        }

        abort(404);
    }
}
