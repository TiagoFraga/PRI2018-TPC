<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1 align="center">Manifesto</h1> 
                <hr/>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="equipa">
        <h3>
            EQUIPA:
        </h3>
        <ol>
            <xsl:apply-templates/>
        </ol>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resumo">
        <h3>
            RESUMO:
        </h3>
        <p>
            <xsl:apply-templates/> 
        </p>
        <hr/>
        
    </xsl:template>
    
    <xsl:template match="resultados">
        <h3>
            RESULTADOS:
        </h3>
        <ul>
            <xsl:apply-templates/>
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="id">
        <li>
            ID : <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="titulo">
        <li>
            Titulo : <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="subtitulo">
        <li>
            Sub-Titulo : <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="dinicio">
        <li>
            Data de Inicio : <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="dfim">
        <li>
            Data de Fim : <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="supervisor">
        <li>
            Supervisor: 
            <a href="{website}">
                <xsl:value-of select="nome"/>
            </a>
            ->
            <a href="mailto:{email}">
               Enviar Correio
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="elemento">
        <li>
            <xsl:value-of select="id"/> - <xsl:value-of select="nome"/> ->
            <a href="mailto:{email}"> E-mail </a> -  <a href="{website}"> WebSite </a> - <a href="{foto/@path}"> Foto </a>
        </li>
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:value-of select="."/>
        </b>
        
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:value-of select="."/>
        </i>
        
    </xsl:template>
    
    <xsl:template match="resultado">
        <li>
            <a href="{@path}"> <xsl:value-of select="."/></a>
        </li>
    </xsl:template>
    
    
    
    
    
    
</xsl:stylesheet>