var express = require('express');
var router = express.Router();
var storesSchema = require('../models/StoresSchema');

router.get('/', function (req, res) {

    res.render('near');
    //var mlat = 10.767058299999999, mlong = 106.6904876, slat, slong, earthRadius = 6371;
    //var Decimal = require('decimal');
    /*storesSchema.store.find(function (err, arrStore) {
        if (arrStore && arrStore.length > 0) {
            console.log(arrStore);
            req.session.store = arrStore;
            res.render('home', { title: 'Có', store: req.session.store});

            *//*arrStore.forEach(function (s) {
                slat= s.lat;
                slong= s.long;
                *//**//*console.log(mlat + " " + mlong + " " + slat + " " + slong);*//**//*
                var radlat1 = Math.PI * mlat / 180;

                var radlat2 = Math.PI * mlong / 180;

                var radlon1 = Math.PI * slat / 180;

                var radlon2 = Math.PI * slong / 180;

                var theta = mlong - slong;

                var radtheta = Math.PI * theta / 180

                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

                dist = Math.acos(dist);

                dist = dist * 180 / Math.PI;

                dist = dist * 60 * 1.1515;

                console.log(dist/earthRadius);*//*

                *//*slat = s.lat;
                 slong = s.long;

                 var dLat = (slat - mlat) * Math.PI / 180;
                 var dLon = (slong - mlong) * Math.PI / 180;

                 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                 Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(mlat) * Math.cos(mlong);
                 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                 var d = earthRadius * c;
                 console.log(Math.round(d * Math.pow(10, Decimal)) / Math.pow(10, Decimal));*//*
            //});
        } else {
            res.render('index', { title: 'Không' });
        }
    })*/
});
module.exports = router;
