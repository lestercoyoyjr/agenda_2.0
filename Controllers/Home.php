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
            $id = $_POST['id'];
            if ($id == '') {
                $respuesta = $this->model->registrar($evento, $fecha, $color);

                if ($respuesta == 1) {
                    $mensaje = array('msg'=>'Evento Registrado', 'estado'=>true, 'tipo'=>'success');
                } else {
                    $mensaje = array('msg'=>'ERROR: Error al registrar el evento', 'estado'=>false, 'tipo'=>'error');
                }
            } else {
                $respuesta = $this->model->modificar($evento, $fecha, $color, $id);
                if ($respuesta == 1) {
                    $mensaje = array('msg'=>'Evento Modificado', 'estado'=>true, 'tipo'=>'success');
                } else {
                    $mensaje = array('msg'=>'ERROR: Error al modificar el evento', 'estado'=>false, 'tipo'=>'error');
                }
            }

            
            echo json_encode($mensaje);
            die();
        }
    }

    public function listar()
    {
        $data = $this->model->listarEventos();
        // print_r($data); just to show the array content
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    
    public function eliminar($id)
    {
        $data = $this->model->eliminar($id);
        if ($data == 1) {
            $mensaje = array('msg'=>'Evento eliminado', 'estado'=>true, 'tipo'=>'success');
        } else {
            $mensaje = array('msg'=>'ERROR: Error al eliminar el evento', 'estado'=>false, 'tipo'=>'error');
        }
        echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
        die();
    }
    
    public function drop()
    {   
        $fecha = $_POST['fecha'];
        $id = $_POST['id'];

        $data = $this->model->drop($fecha, $id);
        if ($data == 1) {
            $mensaje = array('msg'=>'Evento movido', 'estado'=>true, 'tipo'=>'success');
        } else {
            $mensaje = array('msg'=>'ERROR: Error al mover el evento', 'estado'=>false, 'tipo'=>'error');
        }
        echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
        die();
    }
}
