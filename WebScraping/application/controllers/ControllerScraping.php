<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ControllerScraping extends CI_Controller {

	public function index()
	{
		$this->load->view('header');
		$this->load->view('body');
		$this->load->view('footer');
	}

	public function searchForScrap(){
		$data = $this->input->post('data');
		$context = array('http' => array('proxy' => 'tcp://proxy-2:8080','request_fulluri' => true,),);
		$stream = stream_context_create($context);
		$search_term = preg_replace('/\s+/','+', $data);
		$url = "https://www.google.co.id/search?q=".$search_term;
		// $url = "https://www.oto.com/mobil-populer";
		$html = file_get_html($url, false, $stream);
		$i = 0;
		$scrapResult = [];
		foreach($html->find('div[class="g"]') as $e){				
			foreach ($e->find('h3[class="r"]') as $key ) {
				foreach ($key->find('a') as $value) {
					$link = str_replace("/url?q=", "", $value->attr['href']);
					$post = strpos($link, "&");
					$fixed_link = substr($link, 0, $post);
					
					$scrapResult['data'][$i]["title"] = (String)$value;
					$scrapResult['data'][$i]["link"] =	(String)$fixed_link;
				}
			}
			foreach ($e->find('div[class="s"]') as $key ) {
				$scrapResult['data'][$i++]["meta"] = (String)$key;
				
			}

			// $scrapResult[$i++] = $scrapResult2;
		}	

		$j = 0;
		foreach($html->find('div[id="foot"] td') as $e){				
			$scrapResult["pagination"][$j++] = (String)$e;
		}

		$response = array(
			$res = $scrapResult
		);
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($response));
	}

	public function searchForScrapPaging(){
		$data = $this->input->post('data');
		$context = array('http' => array('proxy' => 'tcp://proxy-2:8080','request_fulluri' => true,),);
		$stream = stream_context_create($context);
		
		$url = $data;
		// $url = "https://www.oto.com/mobil-populer";
		$html = file_get_html($url, false, $stream);
		$i = 0;
		$scrapResult = [];
		foreach($html->find('div[class="g"]') as $e){				
			foreach ($e->find('h3[class="r"]') as $key ) {
				foreach ($key->find('a') as $value) {
					$link = str_replace("/url?q=", "", $value->attr['href']);
					$post = strpos($link, "&");
					$fixed_link = substr($link, 0, $post);
					
					$scrapResult['data'][$i]["title"] = (String)$value;
					$scrapResult['data'][$i]["link"] =	(String)$fixed_link;
				}
			}
			foreach ($e->find('div[class="s"]') as $key ) {
				$scrapResult['data'][$i++]["meta"] = (String)$key;
				
			}

			// $scrapResult[$i++] = $scrapResult2;
		}	

		$j = 0;
		foreach($html->find('div[id="foot"] td') as $e){				
			$scrapResult["pagination"][$j++] = (String)$e;
		}

		$response = array(
			$res = $scrapResult
		);
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($response));
	}
}
