<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <!--***********************************************************MAIN TEMPLATE**********************************************************-->
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1 align="center">
                        <xsl:value-of select="/tstmt/coverpg/title"/>
                    </h1>
                    <h5 align="center">
                        <xsl:value-of select="/tstmt/coverpg/title2"/>
                    </h5>
                    <xsl:apply-templates select="/tstmt/converpg/subtitle" mode ="indice"/>
                    <hr/>
                    <table width="100%">
                        <tr>
                            <td width="20%" valign="top">
                                <h3>
                                    <a name="indice">
                                        List of Suras:
                                    </a>
                                </h3>
                                <ul>
                                    <xsl:apply-templates  select="tstmt/suracoll/sura" mode="indice"/>
                                </ul>
                            </td>
                            <td width="80%" valign="top">
                                <h4>
                                    <xsl:value-of select="tstmt/titlepg/subtitle/p"/>
                                </h4>
                                <xsl:apply-templates mode="conteudo" select="tstmt/preface"/>
                            </td>
                            
                        </tr>
                        
                    </table>
                </body>
            </html>
        </xsl:result-document> 
        <!-- Geração das paginas individuais-->
        <xsl:apply-templates/> 
    </xsl:template>
    
    <!--***********************************************************PÁGINA INICIAL & INDICE**********************************************************-->
    
    <!--Geração do indice-->
    <xsl:template match="sura" mode="indice">
        <li>
            <a href="sura{count(preceding-sibling::*)+1}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <!--Elimina o texto que nao interessa do indice-->
    <xsl:template match="text()" mode="indice" priority="-1"/>
    
    <!--Seleciona o conteudo dos subtitulos da coverpage -->
    <xsl:template match="p" mode="indice">
        <h5>
            <xsl:value-of select="."/>
        </h5>
    </xsl:template>
    
    <!-- Seleciona o titulo do prefácio -->
    <xsl:template mode="conteudo" match="preface">
        <b><i><xsl:value-of select="ptitle"/>:</i></b>
        <p>
            <xsl:apply-templates select="p"/>
        </p>
    </xsl:template>
    
    <!--Seleciona cada paragrafo do prefacio -->
    <xsl:template  match="p">
        <xsl:value-of select="."/>
    </xsl:template>
    
    <!--***********************************************************PÁGINAS INDIVIDUAIS - SURAS**********************************************************-->
    
    <xsl:template match = "suracoll/sura">
        <xsl:result-document href="website/sura{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1 align="center">
                        <xsl:value-of select="bktlong"/>
                    </h1>
                    <h5 align="center">
                        <xsl:value-of select="bktshort"/>
                    </h5>
                    <p>
                        <a href="index.html">
                            [Voltar ao índice]
                        </a>
                    </p>
                    <hr/>
                    <h4>
                        <xsl:value-of select="epigraph"/>
                    </h4>
                    <ul>
                        <xsl:apply-templates/>
                    </ul>
                    <hr/>
                    <p>
                        <a href="index.html">
                            [Voltar ao índice]
                        </a>
                    </p>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="bktlong"/>
    
    <xsl:template match="bktshort"/>
    
    <xsl:template match="epigraph"/>
   
    <xsl:template match="v">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
</xsl:stylesheet>