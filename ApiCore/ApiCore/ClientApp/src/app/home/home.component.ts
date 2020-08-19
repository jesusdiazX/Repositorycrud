import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { debug } from 'util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var swal: any;
//import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public UrlBa: string;
  public loading = false;
  public prooductos: Productos[];

  ResultPost: any
  formProduct: FormGroup;
  Title: string;
  p: number = 1;
  public Brands = [
    {
      id: "Ford",
      descripcion: "Ford",

    },

    {
      id: "Chevrolet",
      descripcion: "Chevrolet",

    },
    {
      id: "Nissan",
      descripcion: "Nissan",

    },
    {
      id: "Toyota",
      descripcion: "Toyota",

    },
    {
      id: "Volkswagen",
      descripcion: "Volkswagen",

    },

  ];
  public Year = [
    {
      id: 2009,
      descripcion: 2009,

    },
  
    {
      id: 2010,
      descripcion: 2010,

    },

    {
      id: 2011,
      descripcion: 2011,

    },
    {
      id: 2012,
      descripcion: 2012,

    },
    {
      id: 2013,
      descripcion: 2013,

    },

    {
      id: 2014,
      descripcion: 2014,

    },
    {
      id: 2015,
      descripcion: 2015,

    },
    {
      id: 2016,
      descripcion: 2016,

    },
    {
      id: 2017,
      descripcion: 2017,

    },

    {
      id: 2018,
      descripcion: 2018,

    },


    {
      id: 2019,
      descripcion: 2019,

    },

    {
      id: 2020,
      descripcion: 2020,

    },

  ];


  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BASE_URL') baseUrl: string) {
    this.UrlBa = baseUrl;

   

    //this.spinner.show();

    //http.get<Productos[]>(baseUrl + 'api/Productos/getProductos').subscribe(result => {
    //  this.prooductos = result;
    //  this.spinner.hide();

    //  console.log(this.prooductos);
    //}, error => console.error(error));
  }






  async ngOnInit() {

    this.formProduct = this.fb.group({
      id:[''],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      kilometers: ['', Validators.required],
      price: [0, Validators.required]
    });

    this.getLista();
  }


  valida($event) {

    var key = window.event ? $event.which : $event.keyCode;
      if (key < 48 || key > 57) {
        event.preventDefault();
      }

  }

  onSubmit(Prod: Productos) {
    
    this.spinner.show();

    const data = this.formProduct.value;

    const D = {
      id: 0,
      model: this.formProduct.value.model,
      descripcion: "--",
      year: parseInt(this.formProduct.value.year),
      brand: this.formProduct.value.brand,
      kilometers: parseInt(this.formProduct.value.kilometers),
      price: this.formProduct.value.price

    }


    if (this.formProduct.value.id == 0 || this.formProduct.value.id == "") {
      this.formProduct.value.id == 0;
      this.http.post<object>(this.UrlBa + 'api/Productos/PostProductos', D, this.HttpOptions).subscribe(result => {
        this.ResultPost = result;
        this.spinner.hide();
        $('#exampleModal').modal('hide');

        swal("Ok !", "Was added successfully!", "success");

        //Swal.fire(
        //  'Ok!',
        //  'Was added successfully!',
        //  'success'
        //)

        this.getLista();

        console.log(this.ResultPost);
      }, error => console.error(error));



    } else {

      this.http.put<object>(this.UrlBa + 'api/Productos/putProductos', data, this.HttpOptions).subscribe(result => {
        this.ResultPost = result;
        $('#exampleModal').modal('hide');
        this.getLista();
        this.spinner.hide();

        swal("Ok !", "WIt was updated successfully!", "success");

        //Swal.fire(
        //  'Ok !',
        //  'WIt was updated successfully!',
        //  'success'
        //)

        console.log(this.ResultPost);
      }, error => console.error(error));



    }
  

  }

  getLista() {
    this.spinner.show();

    this.http.get<Productos[]>(this.UrlBa + 'api/Productos/getProductos').subscribe(result => {
      this.prooductos = result;
      this.spinner.hide();

      console.log(this.prooductos);
    }, error => console.error(error));


  }

  update(Prod) {

    this.Title = "Update Product";

    this.formProduct.controls.id.setValue(Prod.id);
    this.formProduct.controls.brand.setValue(Prod.brand);
    this.formProduct.controls.model.setValue(Prod.model);
    this.formProduct.controls.year.setValue(Prod.year);
    this.formProduct.controls.kilometers.setValue(Prod.kilometers);
    this.formProduct.controls.price.setValue(Prod.price);

   // $("#exampleModal").show();
    $('#exampleModal').modal('toggle');
  }


  Delete(id) {


    //swal({
    //  title: "Are you sure?",
    //  text: "It will be permanently removed!",
    //  type: "warning",
    //  showCancelButton: true,
    //  confirmButtonClass: "btn-danger",
    //  cancelButtonColor: '#adb5bd;',
    //  confirmButtonText: "Yes !",
    //  closeOnConfirm: false
    //},
    //  function (event) {

    //    setTimeout(function () {

    //      this.http.delete(this.UrlBa + 'api/Productos/DelteProductos?id=' + id, this.HttpOptions).subscribe(result => {
    //        this.ResultPost = result;

    //        swal("Deleted!", "Your data has been deleted.", "success");

    //        this.getLista();

    //        console.log(this.ResultPost);
    //      }, error => console.error(error));

    //    }, 2000);

      

        
       this.http.delete(this.UrlBa + 'api/Productos/DelteProductos?id=' + id, this.HttpOptions).subscribe(result => {
         this.ResultPost = result;

         swal("Deleted!", "Your data has been deleted.", "success");
        
         this.getLista();

         console.log(this.ResultPost);
       }, error => console.error(error));




    //  });


    //Swal.fire({
    // title: 'Are you sure?',
    // text: "It will be permanently removed!",
    // icon: 'warning',
    // showCancelButton: true,
    // confirmButtonColor: '#dc3545',
    // cancelButtonColor: '#adb5bd;',
    // confirmButtonText: 'Yes, delete it!'
    //}).then((result) => {
    // if (result.value) {

    //   this.http.delete(this.UrlBa + 'api/Productos/DelteProductos?id=' + id, this.HttpOptions).subscribe(result => {
    //     this.ResultPost = result;
    //     Swal.fire(
    //       'Deleted!',
    //       'Your data has been deleted.',
    //       'success'
    //     )
    //     this.getLista();

    //     console.log(this.ResultPost);
    //   }, error => console.error(error));

        
    // }
    //})



    

    
  }

  NewProduct() {

    this.Title = "New Product";

    this.ngOnInit();

    $('#exampleModal').modal('toggle');




  }


}



interface Productos {
  id: number;
  model: string;
  descripcion: string;
  year: number;
  brand: string;
  kilometers: number;
  price: number;
}
