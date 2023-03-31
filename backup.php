<?php
    if(isset($_POST)) {
        $data = file_get_contents("php://input");

        $stream = json_decode($data, true);

        echo json_encode($stream);

        $date = date_create();
        $timeStamp = date_timestamp_get($date);
        $bkPath = "backup$timeStamp.json";
        //copy('bestlapsdata.json', $bkPath);
        
        $fp = fopen($bkPath, 'w');
        //$bk = fopen("backup$timeStamp.json", 'w');        

        fwrite($fp, json_encode($stream));
        
        fclose($fp);
    }
?>