<?php
    class HomeModel extends Query{
        public function __construct()
        {
            parent::__construct();
        }
        public function registrar($evento, $fecha, $color){
            $sql = "INSERT INTO eventos (title, start, color) VALUES (?,?,?)";
            $array = array($evento,$fecha,$color);

            // We verify if date has been registered
            $data = $this->save($sql, $array);

            if ($data == 1) {
                $msg = 1;
            } else {
                $msg = 0;
            }

            return $msg;
        }
        public function modificar($evento, $fecha, $color, $id){
            $sql = "UPDATE eventos SET title=?, start=?, color=? WHERE id=?";
            $array = array($evento,$fecha,$color, $id);

            // We verify if date has been registered
            $data = $this->save($sql, $array);

            if ($data == 1) {
                $msg = 1;
            } else {
                $msg = 0;
            }

            return $msg;
        }
        public function eliminar($id){
            $sql = "DELETE FROM eventos WHERE id=?";
            $array = array($id);

            // We verify if date has been registered
            $data = $this->save($sql, $array);

            if ($data == 1) {
                $msg = 1;
            } else {
                $msg = 0;
            }

            return $msg;
        }
        public function listarEventos()
        {
            $sql = "SELECT * FROM eventos";
            // $data =  $this->selectAll($sql);
            return $this->selectAll($sql);
        }
    }

?>