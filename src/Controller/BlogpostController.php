<?php

namespace App\Controller;

use App\Repository\BlogPostRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BlogpostController extends AbstractController
{
    #[Route('/blogpost', name: 'app_blogpost')]
    public function index(
        BlogPostRepository $blogPostRepository,
        PaginatorInterface $paginator,
        Request $request
        ): Response
    {
        $data = $blogPostRepository->findAll();

        $articles = $paginator->paginate(
            $data, 
            $request->query->getInt('page', 1),
            6
        );

        return $this->render('blogpost/blogpost.html.twig', [
            'articles' => $articles,
        ]);
    }
}