'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NextButton } from '@/components/elements/NextButton';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';

const Projects = () => {
    const [projects] = useState([
        {
            title: 'Project 1',
            description: 'A modern web application built with React and Node.js',
            image: 'https://cdn.vietnambiz.vn/2020/1/15/photo-1579088919332-157908891933486975461.jpg',
            tags: ['React', 'Node.js', 'MongoDB'],
            github: 'https://github.com/yourusername/project1',
            demo: 'https://project1.demo.com'
        },
        // Add more projects here
    ]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen px-4"
        >
            <div className="max-w-4xl mx-auto">
                <Header backdrop="WORKS" title="MY PORTFOLIO" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                        >
                            <Image width={100} height={100} src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, i) => (
                                        <motion.span 
                                            key={i}
                                            whileHover={{ scale: 1.1 }}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <motion.a 
                                        whileHover={{ scale: 1.05 }}
                                        href={project.github} 
                                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                                    >
                                        GitHub
                                    </motion.a>
                                    <motion.a 
                                        whileHover={{ scale: 1.05 }}
                                        href={project.demo} 
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                                    >
                                        Live Demo
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className='mt-16 flex justify-center'>
                <NextButton content="Contact me" class="" href={"/contact"}/>

            </div>
            
        </motion.div>
    );
};

export default Projects;