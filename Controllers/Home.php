<?php
class Home extends Controller
{
    public function __construct() {
        parent::__construct();
    }
    public function index(){
        $this->views->getView($this, 'index');
    }
    public function registrar()
    {
        // if one field or all are empty
        if (empty($_POST['title']) || empty($_POST['start']) || empty($_POST['color'])) {
            $mensaje = array('msg'=>'Todos los campos son requeridos', 'estado'=>false, 'tipo'=>'warning');
        } else {
            $evento = $_POST['title'];
            $fecha = $_POST['start'];
            $color = $_POST['color'];

            $respuesta = $this->model->registrar($evento, $fecha, $color);

            if ($respuesta == 1) {
                $mensaje = array('msg'=>'Evento Registrado', 'estado'=>true, 'tipo'=>'success');
            } else {
                $mensaje = array('msg'=>'ERROR: Error al registrar el evento', 'estado'=>false, 'tipo'=>'error');
            }
            echo json_encode($mensaje);
            die();
        }
    }
    public function listar()
    {
        $data = $this->model->listarEventos();
        print_r($data);
    }
}
